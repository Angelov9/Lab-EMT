package mk.ukim.finki.library.model.exceptions;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(String username) {
        super(String.format("User %s was not found!", username));
    }
}
