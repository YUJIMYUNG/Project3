package web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.model.entity.RecordEntity;

public interface RecordRepository extends JpaRepository<RecordEntity, Integer> {
}
