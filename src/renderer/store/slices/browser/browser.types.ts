interface PageState {
  scrollPosition?: { x: number; y: number };
  formData?: any;
}

interface VisitPagePayload {
  url: string;
  title: string;
  pageState: PageState;
}

interface HistoryEntry {
  url: string;
  title: string;
  pageState: PageState;
  timeStamp: string;
}

export type { VisitPagePayload, PageState, HistoryEntry };