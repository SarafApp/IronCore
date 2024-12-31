import { reactive, ref, watch } from "vue";
import { FormManager } from "./FormManager";
import { FormValidationStatus } from "../constants";

export function useForm(form: FormManager) {
  const reactiveForm = reactive<FormManager>(form);
  const validationStatus = ref<FormValidationStatus>(
    FormValidationStatus.Invalid,
  );

  watch(
    () => reactiveForm.getInputControlsAsArray(),
    () => {
      reactiveForm.runValidation();
      if (reactiveForm.getIsValid()) {
        validationStatus.value = FormValidationStatus.Valid;
      } else {
        validationStatus.value = FormValidationStatus.Invalid;
      }
    },
    {
      immediate: true,
      deep: true,
    },
  );

  return {
    reactiveForm,
    validationStatus,
  };
}
