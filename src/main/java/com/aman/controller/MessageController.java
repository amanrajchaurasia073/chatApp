package com.aman.controller;

import com.aman.model.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessageController {
    @MessageMapping(value = "/message")
    @SendTo(value = "/topic/return-to") // if any-body subscribe this then all of them get message
    public Message getContent(@RequestBody Message message)
    {
        try{
            Thread.sleep(2000);
        }
        catch (InterruptedException e)
        {
            e.printStackTrace();
        }
        return message;
    }
}
