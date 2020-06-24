package com.codesquad.issuetracker.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorMessage {

    // COMMON
    INTERNAL_SERVER_ERROR("Backend Error"),
    METHOD_NOT_ALLOWED("Method Not Allowed"),

    // ENTITY
    LABEL_NAME_DUPLICATED("Name has already been taken"),
    MILESTONE_TITLE_DUPLICATED("Title has already been taken"),
    ENTITY_UPDATE_FAILED("Failed to update"),
    ENTITY_DELETE_FAILED("Failed to delete"),
    ENTITY_NOT_FOUND("Failed to get"),

    // USER
    UNAUTHORIZED("Need to Login"),
    ACCESS_DENIED("Access is Denied"),
    INVALID_JWT_TOKEN("Invalid Jwt Token"),
    INVALID_INPUT_VALUE("Invalid Input Value");

    private String message;
    
}
