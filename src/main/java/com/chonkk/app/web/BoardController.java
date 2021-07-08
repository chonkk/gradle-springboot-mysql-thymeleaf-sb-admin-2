package com.chonkk.app.web;

import com.chonkk.app.domain.Board;
import com.chonkk.app.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class BoardController {
    @Autowired
    private BoardService boardService;

    @RequestMapping(value = "/insert", method = RequestMethod.POST)
    public ResponseEntity<String> save(@RequestBody com.chonkk.app.web.BoardRequest boardRequest){
        try{
            Long ret = boardService.save(boardRequest);
            return new ResponseEntity<>("Success",HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>("Error", HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/find/{id}",method = RequestMethod.GET)
    public ResponseEntity<Board> findBoardById(@PathVariable("id") Long id){
        return new ResponseEntity<>(boardService.findBoardById(id),HttpStatus.OK);
    }

    @RequestMapping(value = "/delete/{id}",method = RequestMethod.DELETE)
    public ResponseEntity<String> delete(@PathVariable("id") Long id){
        try{
            boardService.delete(id);
            return new ResponseEntity<>("Success",HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>("Error", HttpStatus.OK);
        }
    }


    @RequestMapping(value = "/update",method = RequestMethod.PUT)
    public ResponseEntity<String> update(@RequestBody com.chonkk.app.web.BoardRequest boardRequest){
        try{
            Long ret = boardService.save(boardRequest);
            return new ResponseEntity<>("Success",HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>("Error", HttpStatus.OK);
        }
    }

}
