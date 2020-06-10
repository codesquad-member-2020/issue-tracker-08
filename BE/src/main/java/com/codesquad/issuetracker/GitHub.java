package com.codesquad.issuetracker;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class GitHub {

    private List<Issue> issues;
}
