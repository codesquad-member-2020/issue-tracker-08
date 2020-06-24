package com.codesquad.issuetracker.user.domain;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, UserId> {
    User findFirstByOrderByIdDesc();

    User findByNickname(String nickname);
}
