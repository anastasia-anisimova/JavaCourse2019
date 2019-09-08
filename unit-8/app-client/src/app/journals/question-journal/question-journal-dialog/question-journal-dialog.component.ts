import {ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {QuestionJournalItem} from 'src/app/model/question-journal-item.model';
import {QuestionJournalItemAnswer} from '../../../model/question-journal-item-answer.model';
import {AnswersListComponent} from '../components/answers-list/answers-list.component';

export interface JournalData {
  journalItem: QuestionJournalItem;
  eventLabel: string;
  answersCountItems: number[];
}

export interface QuestionJournalDialogResult {
  name: string;
  answersCount: number;
  answers: QuestionJournalItemAnswer[];
}

@Component({
  selector: 'app-question-journal-dialog',
  templateUrl: './question-journal-dialog.component.html',
  styleUrls: ['./question-journal-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class QuestionJournalDialogComponent implements OnInit {

  @ViewChild(AnswersListComponent, {static: false})
  child: AnswersListComponent;

  public eventLabel: string;
  public answersCountItems: number[];
  public dialogForm: FormGroup;
  public answersFormArray: FormArray;

  public showErrorMessage: boolean;
  private description: string;
  private answersCount: number;
  private answers: QuestionJournalItemAnswer[] = [];

  constructor(public dialogRef: MatDialogRef<QuestionJournalDialogComponent>,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: JournalData) {
  }

  ngOnInit() {
    this.fillData();
    this.fillForm();
  }

  addAnswer() {
   this.answersFormArray.push(
      new FormGroup({
          answerText: new FormControl('', Validators.required),
          isCorrect: new FormControl(false, Validators.required)
        }
      )
    );
  }

  removeItem(index: number) {
    this.answersFormArray.removeAt(index);
  }

  private fillData() {
    this.eventLabel = this.data.eventLabel;
    this.answersCountItems = this.data.answersCountItems;

    if (this.data.journalItem) {
      this.description = this.data.journalItem.name;
      this.answersCount = this.data.journalItem.answersCount;
      this.answers = this.data.journalItem.answers;
    }
  }

  private fillForm() {
    const answersArr: FormGroup[] = this.answers.map(ans =>
      new FormGroup({
          answerText: new FormControl(ans.answerText, Validators.required),
          isCorrect: new FormControl(ans.isCorrect, Validators.required)
        }
      )
    );

    this.dialogForm = this.fb.group({
      description: new FormControl(this.description, Validators.required),
      answersArray: this.fb.array(answersArr),
    });

    this.answersFormArray = this.dialogForm.get('answersArray') as FormArray;

  }


  onDialogSubmit() {
    this.answers = this.answersFormArray.value;
    console.log(this.answers);

    // const newValues: QuestionJournalDialogResult = {
    //   name: this.dialogForm.get('description').value,
    //   answersCount: this.dialogForm.get('answersCount').value,
    //   answers: this.answers,
    // };
    //
    // this.dialogRef.close(newValues);


  }

  closeDialog() {
    this.dialogRef.close();
  }

}
