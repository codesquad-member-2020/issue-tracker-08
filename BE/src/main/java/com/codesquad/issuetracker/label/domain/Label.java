package com.codesquad.issuetracker.label.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Label {

    @EmbeddedId
    private LabelId id;

    @Size(max = 50)
    @Column(name = "name", unique = true)
    private String name;

    private String description;

    private String color;

    @JsonProperty("isFontColorBlack")
    private boolean isFontColorBlack;

    public static Label of(LabelId labelId, Label label) {
        return Label.builder()
                .id(labelId)
                .name(label.name)
                .description(label.description)
                .color(label.color)
                .isFontColorBlack(label.isFontColorBlack)
                .build();
    }
}
