package kr.codesquad.todo.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import kr.codesquad.todo.dto.request.CardMoveRequest;
import kr.codesquad.todo.service.ActionService;

@Component
@Aspect
public class ActionAop {

	private final ActionService actionService;

	public ActionAop(ActionService actionService) {
		this.actionService = actionService;
	}

	@AfterReturning(pointcut = "@annotation(actionLogging)", returning = "id")
	public void logAction(JoinPoint joinPoint, Long id, ActionLogging actionLogging) {
		Long originCategoryId = null;
		if (joinPoint.getArgs().length > 1 && joinPoint.getArgs()[1] instanceof CardMoveRequest) {
			originCategoryId = ((CardMoveRequest)joinPoint.getArgs()[1]).getToCategoryId();
		}
		actionService.create(id, actionLogging.value(), originCategoryId);
	}
}
