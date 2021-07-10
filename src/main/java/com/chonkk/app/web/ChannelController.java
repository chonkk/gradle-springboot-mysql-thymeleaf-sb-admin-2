package com.chonkk.app.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/channel")
public class ChannelController {


    @GetMapping({"","/"})
    public String channel() {
        return "channel";
    }
}
