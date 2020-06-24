package com.codesquad.issuetracker.label.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LabelDTO {

    private Long id;

    private String name;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String description;

    private String color;

    private Boolean isFontColorBlack;

    public static LabelDTO from (Label label) {
        return LabelDTO.builder()
                .id(label.getId().getLabelId())
                .name(label.getName())
                .description(label.getDescription())
                .color(label.getColor())
                .isFontColorBlack(label.isFontColorBlack())
                .build();
    }
}
