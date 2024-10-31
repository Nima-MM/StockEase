package de.hoomit.stockmanagement.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class ColorTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Color getColorSample1() {
        return new Color().id(1L).name("name1");
    }

    public static Color getColorSample2() {
        return new Color().id(2L).name("name2");
    }

    public static Color getColorRandomSampleGenerator() {
        return new Color().id(longCount.incrementAndGet()).name(UUID.randomUUID().toString());
    }
}
