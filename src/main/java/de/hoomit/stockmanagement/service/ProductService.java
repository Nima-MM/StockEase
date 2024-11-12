package de.hoomit.stockmanagement.service;

import de.hoomit.stockmanagement.domain.Product;
import de.hoomit.stockmanagement.repository.ProductRepository;
import jakarta.annotation.Resource;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ProductService.class);

    @Resource
    private ProductRepository productRepository;

    /**
     * returns a Product associated to given Id.
     * If Product could not be found, an empty {@link Optional}
     * will be returned.
     *
     * @param id the Id of Product
     * @return an {@link Optional} containing found Product
     */
    public Optional<Product> getProduct(final Long id) {
        LOGGER.info("Getting Product Stock for Id: " + id);

        return productRepository.findById(id);
    }

    public Iterable<Product> getProducts() {
        LOGGER.info("Getting All Products");

        return productRepository.findAll();
    }

    /**
     * Increases the Product stock by given amount.
     *
     * @param id     the Id of Product
     * @param amount number of stock that must be added to current stock
     * @return an {@link Optional} containing the newly changed Product
     */
    public Optional<Product> refillProductStock(final Long id, final int amount) {
        LOGGER.info("Refilling Product Stock for Id: " + id);

        return productRepository
            .findById(id)
            .map(product -> {
                final int newStock = product.getStock() + amount;

                LOGGER.info(String.format("Refill Product Stock with amount: %d, new Stock: %d", amount, newStock));

                product.setStock(newStock);
                productRepository.save(product);

                return product;
            });
    }

    public Optional<Product> decreaseProductStock(final Long id, final int amount) {
        return productRepository
            .findById(id)
            .map(product -> {
                final int productStock = product.getStock();
                if (amount > productStock) { // Do we have enough Products to Buy?
                    LOGGER.error(String.format("Exceeding the product stock of: %d", productStock));

                    throw new IllegalArgumentException("Not enough Product stock for Id: " + id);
                }

                // Substract amount from current product stock
                final int newStock = productStock - amount;

                LOGGER.info(String.format("Decreased from Product Id: %s: %d Products, new Stock: %d", product.getId(), amount, newStock));

                product.setStock(newStock);
                productRepository.save(product);

                return product;
            });
    }

    /**
     * Decreases the product stock by given amount.
     * If the current stock is less than bought stocks,
     * an {@link IllegalArgumentException} will be raised.
     *
     * @param id     the Id of Product
     * @param amount number of stock that must be subtracted from current stock
     * @return an {@link Optional} containing the newly changed Product
     */
    public Optional<Product> buyProduct(final Long id, final int amount) {
        LOGGER.info("Buying Product Id: " + id);

        return decreaseProductStock(id, amount);
    }

    public Product updateProduct(final Product product) {
        LOGGER.info("Updating Product: " + product);

        return productRepository.save(product);
    }

    public Product createProduct(final Product product) {
        return productRepository.save(product);
    }

    public void deleteProduct(final Long productId) {
        productRepository.deleteById(productId);
    }
}
