import { BadGatewayException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform<any> {
    readonly allowedStatuses = [
        TaskStatus.DONE,
        TaskStatus.IN_PROGRESS,
        TaskStatus.OPEN];
         transform(value: any) {
           value = value.toUpperCase();
             if (!this.isStatusValid(value)) {
                 throw new BadGatewayException(`"${value}" 不是允许的状态。`);
              }
           return value;
    }
    private isStatusValid(status:any) {
        const idx = this.allowedStatuses.indexOf(status);
        return idx!==-1
    }
       }