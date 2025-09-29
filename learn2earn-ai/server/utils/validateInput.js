export default function validateInput(input){
  return typeof input === 'string' && input.trim().length > 2;
}