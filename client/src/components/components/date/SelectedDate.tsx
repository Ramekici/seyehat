import React from 'react';
import DatePicker from 'react-datepicker';
import './SelectedDate.css';
import { tr } from 'date-fns/locale';

interface SelectedDateItems {
    onChangeHandler(date:Date):void;
    date:Date;
    minDate?:Date;
    maxDate?:Date;
    id:string
}

const SelectedDate:React.FC<SelectedDateItems> = 
    ({onChangeHandler, date, minDate, maxDate, id}) => {
     
    return (
        <DatePicker
          id={id}
          className="example-custom-input"
          dateFormat="dd/MM/yyyy"
          selected={date}
          locale={tr}
          onChange={onChangeHandler}
          tabIndex={1}
          minDate={minDate ? minDate : null}
          maxDate={maxDate ? maxDate : null}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          
       />
    );
}
export default SelectedDate;
