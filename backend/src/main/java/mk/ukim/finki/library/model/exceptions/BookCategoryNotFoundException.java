package mk.ukim.finki.library.model.exceptions;

public class BookCategoryNotFoundException extends RuntimeException {

    public BookCategoryNotFoundException() {
        super("Book Category not found exception!");
    }
}
