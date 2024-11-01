package de.hoomit.stockmanagement.exception;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 * provides a centralized exception handling across all controls to
 * convert all HTTP Statuses to 400 for client to signalize an error
 * happened in backend.
 *
 * @author Hooman Behmanesh
 */
@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    /**
     * Custom Exception handling for {@code IllegalArgumentException}
     *
     * @param ex original exception
     * @return a {@link ResponseEntity} which contains the error message.
     */
    @ExceptionHandler(IllegalArgumentException.class)
    protected ResponseEntity<String> handleIllegalArgumentException(final IllegalArgumentException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
