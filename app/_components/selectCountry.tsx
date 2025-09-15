import { getCountries } from "../_utils/helper";

type Country = {
  defaultCountry: string;
  name: string;
  id: string;
  className: string;
};

async function SelectCountry({ defaultCountry, name, id, className }: Country) {
  const countries = await getCountries();
  const flag =
    countries.find(
      (country: { name: string }) => country.name === defaultCountry
    )?.flag ?? "";

  return (
    <select
      key={defaultCountry}
      name={name}
      id={id}
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value="">Select country...</option>
      {countries.map((c: { name: string; flag: string }) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
