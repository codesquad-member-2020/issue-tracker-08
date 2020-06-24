package com.codesquad.issuetracker.common.exception;

public class UnauthorizedException extends RuntimeException {

    public UnauthorizedException() {
        super(ErrorMessage.UNAUTHORIZED.getMessage());
    }
}
