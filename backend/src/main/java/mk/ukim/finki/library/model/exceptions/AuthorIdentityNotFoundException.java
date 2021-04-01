package mk.ukim.finki.library.model.exceptions;

public class AuthorIdentityNotFoundException extends RuntimeException {

    public AuthorIdentityNotFoundException(String name, String surname) {
        super(String.format("Author with name %s and surname %s was not found.", name, surname));
    }
}
