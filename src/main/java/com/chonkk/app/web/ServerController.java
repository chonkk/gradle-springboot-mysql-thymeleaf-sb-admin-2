package com.chonkk.app.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/server")
public class ServerController {


    @GetMapping({"","/"})
    public String server() {
        return "server_deploy";
    }
    
    @GetMapping({"/content"})
    public String server_content() {
        return "server_content";
    }
    @GetMapping({"/deploy"})
    public String server_deploy() {
        return "server_deploy";
    }
}
