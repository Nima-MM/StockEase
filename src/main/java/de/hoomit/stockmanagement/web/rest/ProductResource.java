package de.hoomit.stockmanagement.web.rest;

import de.hoomit.stockmanagement.domain.Product;
import de.hoomit.stockmanagement.exception.ProductNotFoundException;
import de.hoomit.stockmanagement.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

/**
 * Product Rest Controller
 *
 * @author Hooman Behmanesh
 */

@RestController
@RequestMapping(value = "/api/products")
@CrossOrigin
public class ProductResource {

    private static final Logger LOGGER = LoggerFactory.getLogger(ProductResource.class);

    @Resource
    private ProductService productService;

    /**
     * returns the product for given Id.
     *
     * @param id Product Id which will be searched for.
     * @return found product
     */
    @GetMapping(value = "/{id}")
    @Operation(description = "Returns the product for given Id.")
    public Product getProduct(@PathVariable("id") final Long id) {
        return productService.getProduct(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
    }

    @GetMapping
    @Operation(description = "Lists all products.")
    public Iterable<Product> getProducts() {
        return productService.getProducts();
    }

    /**
     * returns the product stock for given Id.
     *
     * @param id Product Id which the stock will be searched for.
     * @return current product stock
     */
    @GetMapping(value = "/{id}/stock")
    @Operation(description = "returns the product stock for given Id.")
    public long getProductStock(@PathVariable("id") final Long id) {
        return productService.getProduct(id)
                .map(Product::getStock)
                .orElseThrow(() -> new ProductNotFoundException(id));
    }

    /**
     * refills (increase) the product stock for given Id.
     *
     * @param id     Product Id which the stock will be increased.
     * @param amount number of products that must be added
     * @return changed product stock
     */
    @PutMapping(value = "/{id}/refill")
    @Operation(description = "refills (increase) the product stock for given Id.")
    public Product refillProductStock(@PathVariable("id") final Long id, @RequestParam(value = "amount") final long amount) {
        return productService.refillProductStock(id, amount)
                .orElseThrow(() -> new ProductNotFoundException(id));
    }

    /**
     * decreases the product stock for given Id.
     * If there are less products than available stocks, this method
     * returns an Error.
     *
     * @param id     Product Id which the stock will be increased. Default value is "1"
     * @param amount number of products that a customer buys
     * @return changed product stock
     */
    @PutMapping(value = "/{id}/buy")
    @Operation(description = "decreases the product stock for given Id.\n" +
            "If there are less products than available stocks, this method\n" +
            "returns an Error.")
    public Product buyProduct(@PathVariable("id") final Long id, @RequestParam(value = "amount", defaultValue = "1") final long amount) {
        return productService.buyProduct(id, amount)
                .orElseThrow(() -> new ProductNotFoundException(id));
    }

    @PutMapping(value = "/update", consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(description = "updates a product with new data")
    public Product updateProduct(@RequestBody final Product product) throws Exception {
        return productService.updateProduct(product);
    }

    @PostMapping(value = "/add", consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(description = "adds a product with new data")
    public Product addProduct(@RequestBody final Product product) throws Exception {
        if (product.getId() != null) {
            throw new RuntimeException("A new product cannot already have an ID");
        }

        return productService.createProduct(product);
    }

    @DeleteMapping(value = "/{id}")
    @Operation(description = "deletes a product with given Id")
    public void deleteProduct(@PathVariable("id") final Long id) throws Exception {
        productService.deleteProduct(id);
    }
}
