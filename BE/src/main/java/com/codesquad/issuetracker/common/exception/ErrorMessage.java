package com.codesquad.issuetracker.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorMessage {

    LABEL_NAME_DUPLICATED("Name has already been taken");

    private String messsage;
}
