package de.hoomit.stockmanagement.web.rest;

import de.hoomit.stockmanagement.domain.Brand;
import de.hoomit.stockmanagement.repository.BrandRepository;
import de.hoomit.stockmanagement.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link de.hoomit.stockmanagement.domain.Brand}.
 */
@RestController
@RequestMapping("/api/brands")
@Transactional
public class BrandResource {

    private static final Logger LOG = LoggerFactory.getLogger(BrandResource.class);

    private static final String ENTITY_NAME = "brand";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BrandRepository brandRepository;

    public BrandResource(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    /**
     * {@code POST  /brands} : Create a new brand.
     *
     * @param brand the brand to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new brand, or with status {@code 400 (Bad Request)} if the brand has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Brand> createBrand(@RequestBody Brand brand) throws URISyntaxException {
        LOG.debug("REST request to save Brand : {}", brand);
        if (brand.getId() != null) {
            throw new BadRequestAlertException("A new brand cannot already have an ID", ENTITY_NAME, "idexists");
        }
        brand = brandRepository.save(brand);
        return ResponseEntity.created(new URI("/api/brands/" + brand.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, brand.getId().toString()))
            .body(brand);
    }

    /**
     * {@code PUT  /brands/:id} : Updates an existing brand.
     *
     * @param id the id of the brand to save.
     * @param brand the brand to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated brand,
     * or with status {@code 400 (Bad Request)} if the brand is not valid,
     * or with status {@code 500 (Internal Server Error)} if the brand couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Brand> updateBrand(@PathVariable(value = "id", required = false) final Long id, @RequestBody Brand brand)
        throws URISyntaxException {
        LOG.debug("REST request to update Brand : {}, {}", id, brand);
        if (brand.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, brand.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!brandRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        brand = brandRepository.save(brand);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, brand.getId().toString()))
            .body(brand);
    }

    /**
     * {@code PATCH  /brands/:id} : Partial updates given fields of an existing brand, field will ignore if it is null
     *
     * @param id the id of the brand to save.
     * @param brand the brand to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated brand,
     * or with status {@code 400 (Bad Request)} if the brand is not valid,
     * or with status {@code 404 (Not Found)} if the brand is not found,
     * or with status {@code 500 (Internal Server Error)} if the brand couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Brand> partialUpdateBrand(@PathVariable(value = "id", required = false) final Long id, @RequestBody Brand brand)
        throws URISyntaxException {
        LOG.debug("REST request to partial update Brand partially : {}, {}", id, brand);
        if (brand.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, brand.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!brandRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Brand> result = brandRepository
            .findById(brand.getId())
            .map(existingBrand -> {
                if (brand.getName() != null) {
                    existingBrand.setName(brand.getName());
                }

                return existingBrand;
            })
            .map(brandRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, brand.getId().toString())
        );
    }

    /**
     * {@code GET  /brands} : get all the brands.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of brands in body.
     */
    @GetMapping("")
    public List<Brand> getAllBrands(@RequestParam(name = "filter", required = false) String filter) {
        if ("product-is-null".equals(filter)) {
            LOG.debug("REST request to get all Brands where product is null");
            return StreamSupport.stream(brandRepository.findAll().spliterator(), false)
                .filter(brand -> brand.getProduct() == null)
                .toList();
        }
        LOG.debug("REST request to get all Brands");
        return brandRepository.findAll();
    }

    /**
     * {@code GET  /brands/:id} : get the "id" brand.
     *
     * @param id the id of the brand to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the brand, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Brand> getBrand(@PathVariable("id") Long id) {
        LOG.debug("REST request to get Brand : {}", id);
        Optional<Brand> brand = brandRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(brand);
    }

    /**
     * {@code DELETE  /brands/:id} : delete the "id" brand.
     *
     * @param id the id of the brand to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBrand(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete Brand : {}", id);
        brandRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
