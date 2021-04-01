package mk.ukim.finki.library.service.impl;

import mk.ukim.finki.library.model.User;
import mk.ukim.finki.library.model.dto.UserDto;
import mk.ukim.finki.library.model.dto.UserLoginDto;
import mk.ukim.finki.library.model.enumerations.Role;
import mk.ukim.finki.library.model.exceptions.*;
import mk.ukim.finki.library.repository.UserRepository;
import mk.ukim.finki.library.service.UserService;
import org.apache.http.auth.InvalidCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(username));
    }


    @Override
    public User register(UserDto userDto) {
        if (userDto.getUsername() == null || userDto.getUsername().isEmpty() || userDto.getPassword() == null || userDto.getPassword().isEmpty())
            throw new InvalidUsernameOrPasswordException();
        if (!userDto.getPassword().equals(userDto.getRepeatPassword()))
            throw new PasswordsDoNotMatchException();
        if (this.userRepository.findByUsername(userDto.getUsername()).isPresent())
            throw new UsernameAlreadyExistsException(userDto.getUsername());
        User user = new User(userDto.getUsername(), passwordEncoder.encode(userDto.getPassword()), userDto.getName(), userDto.getSurname(), Role.USER);
        return userRepository.save(user);
    }

    @Override
    public User register(String username, String password, String repeatPassword, String name, String surname, Role role) {
        if (username == null || username.isEmpty() || password == null || password.isEmpty())
            throw new InvalidUsernameOrPasswordException();
        if (!password.equals(repeatPassword))
            throw new PasswordsDoNotMatchException();
        if (this.userRepository.findByUsername(username).isPresent())
            throw new UsernameAlreadyExistsException(username);
        User user = new User(username, passwordEncoder.encode(password), name, surname, role);
        return userRepository.save(user);
    }

    @Override
    public User login(UserLoginDto userLoginDto) {
        String username = userLoginDto.getUsername();
        String password = userLoginDto.getPassword();

        if (username == null || username.isEmpty() || password == null || password.isEmpty()) {
            throw new InvalidArgumentsException();
        }

        return userRepository.findByUsernameAndPassword(username,
                password).orElseThrow(InvalidUserCredentialsException::new);
    }

    @Override
    public User login(String username, String password) {
        if (username == null || username.isEmpty() || password == null || password.isEmpty()) {
            throw new InvalidArgumentsException();
        }

        return userRepository.findByUsernameAndPassword(username,
                password).orElseThrow(InvalidUserCredentialsException::new);
    }
}
