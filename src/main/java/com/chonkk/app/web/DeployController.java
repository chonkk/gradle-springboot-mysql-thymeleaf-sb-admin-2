package com.chonkk.app.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/deploy")
public class DeployController {

    @GetMapping({"","/"})
    public String deploy() {
        return "deploy";
    }

    @GetMapping({"/history"})
    public String deploy_history() {
        return "deploy_history";
    }

}
