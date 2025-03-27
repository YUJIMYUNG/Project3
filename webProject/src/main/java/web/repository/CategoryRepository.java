package web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.model.entity.CategoryEntity;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Integer> {
}
