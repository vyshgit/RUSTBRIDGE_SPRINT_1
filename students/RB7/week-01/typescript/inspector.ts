type Events = {
  //Defining an Object
  provider_event_id: string;
  event_type: string;
  amount_minor: number;
  currency: string;
  occurred_at: string;
};
const testEvent: Events =
  //declaring and initializing a test event
  {
    provider_event_id: 'sandbox_1',
    event_type: 'payment.captured',
    amount_minor: 15000,
    currency: 'INR',
    occurred_at: '2026-01-01T10:00:00.000Z',
  };
console.log('Event ID:', testEvent.provider_event_id);
console.log('EVente Type:', testEvent.event_type);
console.log('Amount Minor', testEvent.amount_minor);
function eventInspector(event: Events) {
  //Function which returns a statement containing event id,event type and amount minor
  return `Received a payment ${event.provider_event_id} of type ${event.event_type} with amount ${event.amount_minor}`;
}
console.log(eventInspector(testEvent));
