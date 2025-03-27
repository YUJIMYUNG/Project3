package web.model.entity;


import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@EntityListeners(AuditingEntityListener.class)// 엔티티 변화 감지
@MappedSuperclass // 자체 매핑이 아닌 상속 매핑으로 사용하겠음
public class BaseTime {

    @CreatedDate
    private LocalDateTime createdate;

    @LastModifiedDate
    private LocalDateTime updatedate;
}
