package com.github.siberianintegrationsystems.restApp.controller;

import com.github.siberianintegrationsystems.restApp.controller.dto.*;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/journal")
public class JournalRestController {

    private final String QUESTIONS_JOURNAL_ID = "questions";

    private final List<JournalEntityDTO> journals = Arrays.asList(
            new JournalEntityDTO(QUESTIONS_JOURNAL_ID, "Вопросы", 15)
    );

    private final List<QuestionsItemDTO> questions = Arrays.asList(
            new QuestionsItemDTO("1", "Сколько было назгулов?", 5, Arrays.asList(
                    new Answer("Первый", true),
                    new Answer("Второй", false))));

    @GetMapping("{id}")
    public JournalEntityDTO getJournalEntity(@PathVariable String id) {
        System.out.println("Журнал = " + id);
        return journals.get(0);
    }

    @PutMapping("{id}/rows")
    public JournalResultDTO getRows(@PathVariable String id,
                                    @RequestBody JournalRequestDTO req) {
        List<QuestionsItemDTO> collect = this.questions
                .stream()
                .filter(dto -> dto.name.contains(req.search))
                .collect(Collectors.toList());

        return new JournalResultDTO(collect.size(), collect);
    }
}
