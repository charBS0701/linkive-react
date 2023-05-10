export default function MultiClassName(names) {
    if(Array.isArray(names)) {
        return names.join(' ');
    }
}