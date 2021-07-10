package com.chonkk.app.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/schedule")
public class ScheduleController {

    @GetMapping({"","/"})
    public String schedule() {
        return "schedule";
    }

    @GetMapping({"/import"})
    public String schedule_import() {
        return "schedule_import";
    }

    @GetMapping({"/history"})
    public String schedule_history() {
        return "schedule_history";
    }
}
