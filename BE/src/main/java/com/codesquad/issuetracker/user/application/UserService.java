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
        return userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("존재하지 않는 회원입니다!"));
    }

    public List<User> findAllById(Set<UserId> userIds) {
        List<User> users = (List<User>) userRepository.findAllById(userIds);
        if (users.size() == userIds.size()) {
            return users;
        }
        throw new EntityNotFoundException("존재하지 않는 회원입니다!");
    }
}
