export function assertTruthy(value: any): asserts value is true {
  if(!value) throw new Error('Exepted truthy value');
}
