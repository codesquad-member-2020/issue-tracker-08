package com.codesquad.issuetracker.user.application;

import com.codesquad.issuetracker.user.domain.User;
import com.codesquad.issuetracker.user.domain.UserId;
import com.codesquad.issuetracker.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User createUser(UserId userId, User user) {
        User newUser = User.of(userId, user);
        return userRepository.save(newUser);
    }

    public UserId getNextIdentity() {
        return Optional.ofNullable(userRepository.findFirstByOrderByIdDesc())
                .map(user -> new UserId(user.getId().getUserId() + 1L))
                .orElseGet(() -> new UserId(1L));
    }

    public User findById(UserId userId) {
        return userRepository.findById(userId).orElseThrow(EntityNotFoundException::new);
    }

    public List<User> findAllByIds(Set<UserId> userIds) {
        return StreamSupport.stream(userRepository.findAllById(userIds).spliterator(), false).collect(Collectors.toList());
    }
}
