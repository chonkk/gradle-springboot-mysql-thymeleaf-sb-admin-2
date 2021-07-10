package com.chonkk.app.web;

import com.chonkk.app.domain.board.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/")
public class HomeController {
    @Autowired
    private BoardService boardService;

       @GetMapping(value={"","/","index"})
    public String findBoardById(){
        return "index";
    }

}
