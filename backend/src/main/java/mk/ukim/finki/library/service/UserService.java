package mk.ukim.finki.library.service;

import mk.ukim.finki.library.model.User;
import mk.ukim.finki.library.model.dto.UserDto;
import mk.ukim.finki.library.model.dto.UserLoginDto;
import mk.ukim.finki.library.model.enumerations.Role;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {

    User register(UserDto userDto);

    User register(String username, String password, String repeatPassword, String name, String surname, Role role);

    User login(UserLoginDto userLoginDto);

    User login(String username, String password);

}
