package com.chonkk.app.web;

import com.chonkk.app.domain.board.Board;
import com.chonkk.app.domain.board.BoardService;
import com.chonkk.app.vo.BoardRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @GetMapping(value={"/",""})
    public ModelAndView board(){
            return new ModelAndView ("board");
    }

    @PostMapping("/insert")
    public ResponseEntity<String> save(@RequestBody BoardRequest boardRequest){
        try{
            Long ret = boardService.save(boardRequest);
            return new ResponseEntity<>("Success",HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>("Error", HttpStatus.OK);
        }
    }

    @GetMapping("/list")
    public ResponseEntity<List<Board>> findAllByOrderByIdDesc(){
        return new ResponseEntity<>(boardService.findAllByOrderByIdDesc(),HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Board> findBoardById(@PathVariable("id") Long id){
        return new ResponseEntity<>(boardService.findBoardById(id),HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Long id){
        try{
            boardService.delete(id);
            return new ResponseEntity<>("Success",HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>("Error", HttpStatus.OK);
        }
    }


    @PutMapping(value = "/update")
    public ResponseEntity<String> update(@RequestBody BoardRequest boardRequest){
        try{
            Long ret = boardService.save(boardRequest);
            return new ResponseEntity<>("Success",HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>("Error", HttpStatus.OK);
        }
    }

}
