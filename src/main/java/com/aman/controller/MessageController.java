package com.aman.controller;

import com.aman.model.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;

@Controller
public class MessageController {

    @MessageMapping("/message")
    @SendTo("/topic/return-to")
    public Message send(Message message, SimpMessageHeaderAccessor headerAccessor) {
        return message;
    }
}
