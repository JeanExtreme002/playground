import SvgIcon from '@mui/material/SvgIcon'

/**
 * The Claude mark: twelve rays around a center, alternating long and short.
 *
 * Drawn here by hand — it is an approximation of the official artwork, not the
 * asset itself. Swapping in the real SVG later means replacing the path below.
 */
export default function ClaudeIcon(props) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path d="M12.00 12.00L16.54 10.44L22.08 12.00L16.54 13.56ZM12.00 12.00L15.03 12.59L17.61 15.24L14.02 14.33ZM12.00 12.00L15.62 15.15L17.04 20.73L12.91 16.71ZM12.00 12.00L13.00 14.92L12.00 18.48L11.00 14.92ZM12.00 12.00L11.09 16.71L6.96 20.73L8.38 15.15ZM12.00 12.00L9.98 14.33L6.39 15.24L8.97 12.59ZM12.00 12.00L7.46 13.56L1.92 12.00L7.46 10.44ZM12.00 12.00L8.97 11.41L6.39 8.76L9.98 9.67ZM12.00 12.00L8.38 8.85L6.96 3.27L11.09 7.29ZM12.00 12.00L11.00 9.08L12.00 5.52L13.00 9.08ZM12.00 12.00L12.91 7.29L17.04 3.27L15.62 8.85ZM12.00 12.00L14.02 9.67L17.61 8.76L15.03 11.41Z" />
    </SvgIcon>
  )
}
