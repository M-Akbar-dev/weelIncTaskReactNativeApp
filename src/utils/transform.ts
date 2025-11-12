import { get, isEmpty } from "lodash";
import moment from 'moment';

 
type MomentInput = moment.Moment | string | number | Date | null | undefined;

interface NavigationProps {
  route: {
    params?: { [key: string]: any };
  };
}

interface ReplacableItem {
  id: string | number;
  [key: string]: any; 
}

interface ChatItem {
  senderFirstName: string;
  MessageDetails: string;
}

export const getParams = (props: NavigationProps): { [key: string]: any } => 
  get(props, 'route.params', {});

export const percentage = (percent: number, total: number | undefined): string => {
  if (total === undefined) {
    return '00';
  } else {
    return ((percent / 100) * total).toFixed(0);
  }
};

export const validateEmail = (email: string): boolean => {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w*)*(\.\w{2,3})+$/;
  return re.test(email);
};

export const passwordRegex = (password: string): boolean => {
  const re = /^[A-Za-z0-9]+$/;
  return re.test(password);
};

export const currentDateFunc = (date: MomentInput): string => {
  const format = 'dddd MMM DD hh:mm A';
  return moment(date).format(format);
};
export const currentTime = (date: MomentInput): string => {
  const format = 'hh:mm A';
  return moment(date).format(format);
};
export const todayDateFunc = (date: MomentInput): string => {
  const format = 'yy-MM-DD';
  return moment(date).format(format);
};

export const currentDate = (date: MomentInput): string => {
  const format = 'dddd MMM DD yyyy';
  return moment(date).format(format);
};
export const birthdayDateFunc = (date: MomentInput): string => {
  const format = 'dddd MMM DD yy';
  return moment(date).format(format);
};

export const currentTimeFunc = (): string => {
  const format = 'hh';
  const date = new Date();
  return moment(date).format(format);
};

export const currentAMPMFunc = (): string => {
  const format = 'A';
  const date = new Date();
  return moment(date).format(format);
};

export const year = (date: MomentInput): string => {
  const format = 'yy';
  return moment(date).format(format);
};

export const yearMonth = (date: MomentInput): string => {
  const format = 'MMM yy';
  return moment(date).format(format);
};

export const month = (date: MomentInput): string => {
  const format = 'MMM';
  return moment(date).format(format);
};

export const replace = (
  key: keyof ReplacableItem,
  value: any,
  selectedItem: ReplacableItem,
  array: ReplacableItem[],
): void => {
  array.forEach(function (o) {
    if (o.id === selectedItem.id) {
      if (key in o) {
        o[key as keyof ReplacableItem] = value;
      }
    }
  });
};

const isToday = (d: Date): boolean => {
  const d1 = new Date();
  return (
    d.getFullYear() === d1.getFullYear() &&
    d.getMonth() === d1.getMonth() &&
    d.getDate() === d1.getDate()
  );
};

export const helperFunction = (date: string, time: string): boolean => {
  const [yyyy, mm, dd] = date.split('-');
  let d = new Date(Number(yyyy), Number(mm) - 1, Number(dd));

  if (isToday(d)) {
    const hhmm = d.toTimeString().match(/(\d{2}:\d{2}):.*/)?.[1]; 
    const range = time.split('-');
    
    if (hhmm) {
       return hhmm >= range[0] && hhmm <= range[1];
    }
  }
  return false;
};

export const filterArrayByID = (
  array1: ReplacableItem[] | null | undefined,
  array2: (string | number)[] | null | undefined,
): ReplacableItem[] => {
  let output: ReplacableItem[] = [];
  array1?.forEach(function (item) {
    array2?.filter((array2Item: string | number) => {
      if (String(item?.id) === String(array2Item)) {
        output.push(item);
      }
    });
  });
  return output;
};

export const filterChat = (data: ChatItem[], searchStr: string = ''): ChatItem[] => {
  if (!isEmpty(searchStr)) {
    return data.filter(({ senderFirstName }) => {
      return (
        senderFirstName.toLowerCase().includes(searchStr)
      );
    });
  }
  return data;
};