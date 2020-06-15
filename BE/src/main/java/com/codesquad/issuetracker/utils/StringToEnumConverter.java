package com.codesquad.issuetracker.utils;

import com.codesquad.issuetracker.issue.domain.SortBy;
import org.springframework.core.convert.converter.Converter;

public class StringToEnumConverter implements Converter<String, SortBy> {

    @Override
    public SortBy convert(String source) {
        return SortBy.valueOf(source.toUpperCase());
    }
}
