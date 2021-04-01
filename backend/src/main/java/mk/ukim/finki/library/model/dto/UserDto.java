package mk.ukim.finki.library.model.dto;

import lombok.Data;

@Data
public class UserDto {

    private String username;

    private String password;

    private String repeatPassword;

    private String name;

    private String surname;

    public UserDto(String username, String password, String name, String surname) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.surname = surname;
    }
}
