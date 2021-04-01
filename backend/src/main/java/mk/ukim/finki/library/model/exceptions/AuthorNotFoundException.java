package mk.ukim.finki.library.model.exceptions;

public class AuthorNotFoundException extends RuntimeException {

    public AuthorNotFoundException() {
        super(String.format("Author was not found."));

    }
}
