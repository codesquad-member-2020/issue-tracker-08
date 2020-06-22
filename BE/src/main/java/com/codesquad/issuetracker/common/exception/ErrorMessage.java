package com.codesquad.issuetracker.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorMessage {
  
    LABEL_NAME_DUPLICATED("Name has already been taken"),
    MILESTONE_TITLE_DUPLICATED("Title has already been taken"),
    ENTITY_UPDATE_FAILED("Failed to update"),
    ENTITY_DELETE_FAILED("Failed to delete"),
    UNAUTHORIZED("Need to Login");

    private String message;
    
}
