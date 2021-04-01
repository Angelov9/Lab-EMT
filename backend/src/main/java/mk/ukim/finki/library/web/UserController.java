package mk.ukim.finki.library.web;

import mk.ukim.finki.library.model.User;
import mk.ukim.finki.library.model.dto.UserDto;
import mk.ukim.finki.library.model.dto.UserLoginDto;
import mk.ukim.finki.library.service.UserService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody UserDto userDto) {
        User user = this.userService.register(userDto);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/login")
    public String login(@RequestBody UserLoginDto userLoginDto) {
        this.userService.loadUserByUsername(userLoginDto.getUsername());
        return "MNOGU SI GLUAPVO!";
    }
}
