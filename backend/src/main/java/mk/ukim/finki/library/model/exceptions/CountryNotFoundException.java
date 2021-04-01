package mk.ukim.finki.library.model.exceptions;

public class CountryNotFoundException extends RuntimeException{

    public CountryNotFoundException(String country) {
        super(String.format("The country %s does not exists!", country));
    }

    public CountryNotFoundException(Long id) {
        super(String.format("The country %d does not exists!", id));
    }
}
