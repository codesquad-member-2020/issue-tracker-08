package com.codesquad.issuetracker.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorMessage {

    MILESTONE_TITLE_DUPLICATED("Title has already been taken");

    private String message;
}
