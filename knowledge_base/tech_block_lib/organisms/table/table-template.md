```html
<lib-tb-table [custom]="tableCustom">
  <ng-template libTbTemplate="header">
    <tr>
      <th libTbSortableColumn="id">
        Id
        <lib-tb-sort-icon
          [custom]="{
          field:'id',
          sortIcons: {
            default: 'fal fa-house',
            down: 'fal fa-user',
            up: 'fal fa-xmark'
          }
        }"
        ></lib-tb-sort-icon>
      </th>
      <th libTbSortableColumn="name">
        Name
        <lib-tb-sort-icon [custom]="{field:'name'}"></lib-tb-sort-icon>
      </th>
      <th libTbSortableColumn="email">
        Email
        <lib-tb-sort-icon [custom]="{field:'email'}"></lib-tb-sort-icon>
      </th>
      <th libTbSortableColumn="years">
        Age
        <lib-tb-sort-icon [custom]="{field:'years'}"></lib-tb-sort-icon>
      </th>
      <th>Actions</th>
    </tr>
  </ng-template>
  <ng-template libTbTemplate="body" let-user>
    <tr>
      <td>
        {{user.id}}
      </td>
      <td [libTbEditableColumn]="user.name" [libTbEditableColumnField]="'name'">
        <lib-tb-cell-editor>
          <ng-template libTbTemplate="input">
            <input pInputText type="text" [(ngModel)]="user.name" />
          </ng-template>
          <ng-template libTbTemplate="output">
            {{user.name}}
          </ng-template>
        </lib-tb-cell-editor>
      </td>
      <td>{{user.email}}</td>
      <td>{{user.years}}</td>
      <td><lib-tb-button [custom]="{ icon: 'fa fa-user' }"></lib-tb-button></td>
    </tr>
  </ng-template>
</lib-tb-table>
```
