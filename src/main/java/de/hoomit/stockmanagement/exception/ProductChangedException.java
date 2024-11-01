package de.hoomit.stockmanagement.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * {@code ProductNotFoundException} is a subclass of {@code RuntimeException}
 * that will be thrown in case of a Product could not be found.
 * It takes the passed Product ID and prepares a message to send to client.
 *
 * @author Hooman Behmanesh
 */

@ResponseStatus(value = HttpStatus.CONFLICT)
public class ProductChangedException extends RuntimeException {

    private static final String MESSAGE_PREFIX = "Product with id: %s has been already changed";

    public ProductChangedException(final Long id) {
        super(String.format(MESSAGE_PREFIX, id));
    }

}
