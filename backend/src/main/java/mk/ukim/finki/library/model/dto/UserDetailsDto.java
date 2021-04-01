package mk.ukim.finki.library.model.dto;

import lombok.Data;
import mk.ukim.finki.library.model.User;
import mk.ukim.finki.library.model.enumerations.Role;

@Data
public class UserDetailsDto {

    private String username;

    private Role role;

    public static UserDetailsDto of(User user) {
        UserDetailsDto detailsDto = new UserDetailsDto();
        detailsDto.username =user.getUsername();
        detailsDto.role = user.getRole();

        return detailsDto;
    }
}
